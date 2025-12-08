import {type FormEvent, useState} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
    setIsProcessing(true);

        try {
            setStatusText('Uploading the file...');
            const uploadedFile = await fs.upload([file]);
            if(!uploadedFile) return setStatusText('Error: Failed to upload file');
    
            setStatusText('Converting to image...');
            const imageFile = await convertPdfToImage(file);
            if(!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');
    
            setStatusText('Uploading the image...');
            const uploadedImage = await fs.upload([imageFile.file]);
            if(!uploadedImage) return setStatusText('Error: Failed to upload image');
    
            setStatusText('Preparing data...');
            const uuid = generateUUID();
            const data = {
                id: uuid,
                resumePath: uploadedFile.path,
                imagePath: uploadedImage.path,
                companyName, jobTitle, jobDescription,
                feedback: '',
            };
            await kv.set(`resume:${uuid}`, JSON.stringify(data));
    
            setStatusText('Running OCR on resume image...');
            let resumeText = '';
            try {
                // Prefer passing the File to ai.img2txt
                resumeText = (await ai.img2txt(imageFile.file)) || '';
                console.log('OCR text length:', resumeText.length);
            } catch (err) {
                console.warn('OCR failed (file). Trying uploaded image path fallback:', err);
                try {
                    // fallback: ask the SDK to OCR by uploaded path (may or may not be supported)
                    resumeText = (await ai.img2txt(uploadedImage.path as unknown as File)) || '';
                    console.log('OCR (path) text length:', resumeText.length);
                } catch (err2) {
                    console.warn('OCR via path also failed:', err2);
                }
            }
    
            setStatusText('Analyzing resume with AI (text + image)...');
    
            // Build the instruction payload (include OCR text if available)
            const instruction = prepareInstructions({ jobTitle, jobDescription });
            const messageText = resumeText
                ? `${instruction}\n\nResumeText:\n${resumeText}`
                : instruction;
    
            // Build chat payload with both the image file (uploaded path) and the text
            const chatPayload: ChatMessage[] = [
              {
                role: "user",
                content: [
                  { type: "file", puter_path: uploadedImage.path },
                  { type: "text", text: messageText }
                ]
              }
            ];
    
            // Use ai.chat (multimodal) so we can pass both file + text
            const feedback = await ai.chat(chatPayload);
            if (!feedback) return setStatusText('Error: Failed to analyze resume');
    
            // Extract response text safely
            let feedbackText = '';
            if (typeof feedback.message.content === 'string') {
                feedbackText = feedback.message.content;
            } else if (Array.isArray(feedback.message.content) && feedback.message.content.length) {
                // Try to find a text item in returned content
                const item = feedback.message.content.find((c: any) => c && (c.text || typeof c === 'string'));
                feedbackText = item?.text ?? (typeof item === 'string' ? item : feedback.message.content[0].text ?? '');
            } else {
                console.error('Unexpected AI response content:', feedback.message.content);
                return setStatusText('Error: Unexpected AI response format');
            }
    
            // Strip common code fences or markdown wrappers
            let cleaned = feedbackText.trim();
            if (cleaned.startsWith('```json')) {
                cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
            } else if (cleaned.startsWith('```')) {
                cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
            }
    
            // Parse JSON
            let parsed;
            try {
                parsed = JSON.parse(cleaned);
            } catch (parseErr) {
                console.error('Failed to parse AI JSON response:', cleaned, parseErr);
                return setStatusText('Error: Invalid JSON returned by AI');
            }
    
            // Save and navigate
            data.feedback = parsed;
            await kv.set(`resume:${uuid}`, JSON.stringify(data));
            setStatusText('Analysis complete, redirecting...');
            console.log('Saved analysis:', data);
            navigate(`/resume/${uuid}`);
        } catch (err: any) {
            console.error('Error during analysis:', err);
            setStatusText(`Error: ${err?.message ?? 'Unknown error'}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget; // e.currentTarget IS the form
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-full" />
                        </>
                    ) : (
                        <h2>Drop your resume for an ATS score and improvement tips</h2>
                    )}
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" name="company-name" placeholder="Company Name" id="company-name" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" name="job-title" placeholder="Job Title" id="job-title" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description" />
                            </div>

                            <div className="form-div">
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button className="primary-button" type="submit">
                                Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload