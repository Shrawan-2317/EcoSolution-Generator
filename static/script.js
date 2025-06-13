function fetchSolutions() {
    const wasteMaterial = document.getElementById('wasteMaterial').value;

    fetch('/get_solutions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ wasteMaterial })
    })
        .then(response => response.json())
        .then(data => {
            const outputSection = document.getElementById('output-section');
            outputSection.innerHTML = '';

            if (data.status === 'success') {
                const solutions = data.solutions;
                for (const key in solutions) {
                    const solution = solutions[key];
                    const solutionNameDiv = document.createElement('div');
                    solutionNameDiv.className = 'solution-name';
                    solutionNameDiv.textContent = solution.solutionName;

                    outputSection.appendChild(solutionNameDiv);

                    solution.steps.forEach((step, index) => {
                        const stepDiv = document.createElement('div');
                        stepDiv.className = 'step';
                        stepDiv.textContent = ` ${index + 1}: ${step}`;
                        outputSection.appendChild(stepDiv);
                    });

                    const videoLink = document.createElement('a');
                    videoLink.href = solution.videoLink;
                    videoLink.target = '_blank';
                    videoLink.className = 'video-link';
                    videoLink.textContent = 'View Video';
                    outputSection.appendChild(videoLink);
                }
            } else {
                const errorMessage = document.createElement('p');
                errorMessage.textContent = data.message;
                outputSection.appendChild(errorMessage);
            }
        })
        .catch(error => console.error('Error:', error));
}
