document.getElementById('submitButton').addEventListener('click', async () => {
    const imageInput = document.getElementById('imageUpload');
    const resultsSection = document.getElementById('results');
    const recommendationContainer = document.getElementById('recommendationContainer');

    if (imageInput.files.length === 0) {
        alert('Please upload an image first!');
        return;
    }

    const file = imageInput.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
        // Envoyer l'image au backend
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error('Failed to fetch recommendations');

        const data = await response.json();

        // Afficher les recommandations
        recommendationContainer.innerHTML = '';
        data.recommendations.forEach((style) => {
            const img = document.createElement('img');
            img.src = style.image_url;
            img.alt = style.name;
            recommendationContainer.appendChild(img);
        });

        resultsSection.style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
});