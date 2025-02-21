import { useEffect, useState } from "react";
import axios from "axios";

const QnAFileHandler = () => {
    const [qnaData, setQnaData] = useState([]);
    const [fileId, setFileId] = useState(null);

    useEffect(() => {
        fetchDocuments();
    }, []);

    // Fetch document list and check for 'qnaupload'
    const fetchDocuments = async () => {
        try {
            const response = await axios.get("http://192.168.1.29:8000/api/documents/");
            const documents = response.data.documents;

            // Find 'qnaupload' file
            const existingFile = documents.find(doc => doc.filename === "qnaupload");
            if (existingFile) {
                setFileId(existingFile.id);
                fetchQnAFile(existingFile.id);
            }
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    };

    // Fetch existing Q&A file content
    const fetchQnAFile = async (id) => {
        try {
            const response = await axios.get(`http://192.168.1.29:8000/api/documents/${id}/`);
            setQnaData(response.data); // Assuming response is JSON
        } catch (error) {
            console.error("Error fetching Q&A file:", error);
        }
    };

    // Add new Q&A entry
    const addQnA = (question, answer) => {
        setQnaData(prev => [...prev, { question, answer }]);
    };

    // Delete a specific Q&A entry
    const deleteQnA = (index) => {
        setQnaData(prev => prev.filter((_, i) => i !== index));
    };

    // Save updated Q&A file
    const saveQnAFile = async () => {
        try {
            const fileContent = JSON.stringify(qnaData, null, 2);
            const blob = new Blob([fileContent], { type: "application/json" });
            const formData = new FormData();
            formData.append("file", blob, "qnaupload");

            if (fileId) {
                // Delete the old file before uploading the new one
                await axios.delete(`http://192.168.1.29:8000/api/documents/delete/${fileId}/`);
            }

            // Upload the updated Q&A file
            await axios.post("http://192.168.1.29:8000/api/documents/upload/", formData);

            console.log("Q&A file updated successfully!");
            fetchDocuments(); // Refresh document list
        } catch (error) {
            console.error("Error saving Q&A file:", error);
        }
    };

    return (
        <div>
            <h2>Q&A Manager</h2>
            <ul>
                {qnaData.map((qna, index) => (
                    <li key={index}>
                        <strong>Q:</strong> {qna.question} <br />
                        <strong>A:</strong> {qna.answer}
                        <button onClick={() => deleteQnA(index)}>Delete</button>
                    </li>
                ))}
            </ul>

            <button onClick={() => addQnA("New Question", "New Answer")}>Add Q&A</button>
            <button onClick={saveQnAFile}>Save Q&A File</button>
        </div>
    );
};

export default QnAFileHandler;
