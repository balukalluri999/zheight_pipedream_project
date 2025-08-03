// get the name, id and file from index.html





// Function to handle file upload
async function uploadFile(event) {
    event.preventDefault(); // Prevent the default form submission(empty)

    const id = document.getElementById('id').value;
const email = document.getElementById('email').value;   
const fileInput = document.getElementById('file');
    console.log('Uploading file...');
    // event.preventDefault(); // Prevent the default form submission

    const file = fileInput.files[0]; // Get the selected file

    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);
    formData.append('email', email);

    try {
        const response = await fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            // throw new Error('File upload failed');
            alert('File upload failed: ' + response.statusText);
        }

        const result = await response.json();
        console.log('File uploaded successfully:', result);
        alert('File uploaded successfully!');
    } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file: ' + error.message);
    }
}

const uploadForm = document.getElementById('uploadForm');

uploadForm.addEventListener('submit', uploadFile);


