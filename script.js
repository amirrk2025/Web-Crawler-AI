//
//
// document.getElementById('fetchContentBtn').addEventListener('click', async () => {
//     const url = document.getElementById('url').value;
//     if (!url) {
//         alert('Please enter a URL');
//         return;
//     }
//
//     try {
//         const response = await fetch('/extract-content', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ url })
//         });
//         const data = await response.json();
//
//         if (data.content) {
//             document.getElementById('content').value = data.content;
//             document.getElementById('contentSection').classList.remove('hidden');
//         } else {
//             alert('Error fetching content');
//         }
//     } catch (error) {
//         alert('Error fetching content');
//     }
// });
//
// document.getElementById('askBtn').addEventListener('click', async () => {
//     const content = document.getElementById('content').value;
//     const question = document.getElementById('question').value;
//     if (!question) {
//         alert('Please enter a question');
//         return;
//     }
//
//     try {
//         const response = await fetch('/ask-question', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ content, question })
//         });
//         const data = await response.json();
//
//         if (data.answer) {
//             document.getElementById('answer').textContent = `Answer: ${data.answer}`;
//         } else {
//             document.getElementById('answer').textContent = 'Answer not found';
//         }
//     } catch (error) {
//         document.getElementById('answer').textContent = 'Error communicating with AI';
//     }
// });
//
// // Chat management with skin selection
// const newChatBtn = document.getElementById('newChatBtn');
// const chatList = document.getElementById('chatList');
// const skinSelectionModal = document.getElementById('skinSelectionModal');
// const skinLightBtn = document.getElementById('skinLightBtn');
// const skinDarkBtn = document.getElementById('skinDarkBtn');
//
// newChatBtn.addEventListener('click', () => {
//     // Show the skin selection modal
//     skinSelectionModal.classList.remove('hidden');
//
//     skinLightBtn.addEventListener('click', () => {
//         const newChatItem = createChatItem('Light');
//         chatList.appendChild(newChatItem);
//         skinSelectionModal.classList.add('hidden');
//     });
//
//     skinDarkBtn.addEventListener('click', () => {
//         const newChatItem = createChatItem('Dark');
//         chatList.appendChild(newChatItem);
//         skinSelectionModal.classList.add('hidden');
//     });
// });
//
// // Function to create new chat item with skin
// function createChatItem(skin) {
//     const newChatItem = document.createElement('li');
//     newChatItem.textContent = `Chat ${chatList.children.length + 1} - ${skin} Skin`;
//     newChatItem.addEventListener('click', () => {
//         document.body.classList.add(skin.toLowerCase());
//         // Redirect to specific chat page (you can change this to open another page)
//         alert(`Entering ${skin} Chat`);
//     });
//
//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = 'Delete';
//     deleteBtn.addEventListener('click', () => {
//         chatList.removeChild(newChatItem);
//     });
//
//     newChatItem.appendChild(deleteBtn);
//     return newChatItem;
// }








document.getElementById('fetchContentBtn').addEventListener('click', async () => {
    const url = document.getElementById('url').value;
    if (!url) {
        alert('Please enter a URL');
        return;
    }

    try {
        const response = await fetch('/extract-content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        const data = await response.json();

        if (data.content) {
            document.getElementById('content').value = data.content;
            document.getElementById('contentSection').classList.remove('hidden');
            document.getElementById('contentSection').classList.add('fadeIn');
        } else {
            alert('Error fetching content');
        }
    } catch (error) {
        alert('Error fetching content');
    }
});

document.getElementById('askBtn').addEventListener('click', async () => {
    const content = document.getElementById('content').value;
    const question = document.getElementById('question').value;
    if (!question) {
        alert('Please enter a question');
        return;
    }

    try {
        const response = await fetch('/ask-question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content, question })
        });
        const data = await response.json();

        if (data.answer) {
            document.getElementById('answer').textContent = `Answer: ${data.answer}`;
            document.getElementById('answer').classList.add('fadeIn');
        } else {
            document.getElementById('answer').textContent = 'Answer not found';
            document.getElementById('answer').classList.add('fadeIn');
        }
    } catch (error) {
        document.getElementById('answer').textContent = 'Error communicating with AI';
        document.getElementById('answer').classList.add('fadeIn');
    }
});

// New chat functionality with modal and animations
const newChatBtn = document.getElementById('newChatBtn');
const chatList = document.getElementById('chatList');
const skinSelectionModal = document.getElementById('skinSelectionModal');
const skinLightBtn = document.getElementById('skinLightBtn');
const skinDarkBtn = document.getElementById('skinDarkBtn');

newChatBtn.addEventListener('click', () => {
    // Show the skin selection modal with a fade-in animation
    skinSelectionModal.classList.remove('hidden');
    skinSelectionModal.classList.add('fadeIn');

    skinLightBtn.addEventListener('click', () => {
        const newChatItem = createChatItem('Light');
        chatList.appendChild(newChatItem);
        skinSelectionModal.classList.add('hidden');
    });

    skinDarkBtn.addEventListener('click', () => {
        const newChatItem = createChatItem('Dark');
        chatList.appendChild(newChatItem);
        skinSelectionModal.classList.add('hidden');
    });
});

// Function to create new chat item with skin
function createChatItem(skin) {
    const newChatItem = document.createElement('li');
    newChatItem.classList.add('chat-item');
    newChatItem.textContent = `Chat ${chatList.children.length + 1} - ${skin} Skin`;
    newChatItem.addEventListener('click', () => {
        document.body.classList.add(skin.toLowerCase());
        // Redirect to specific chat page (you can change this to open another page)
        alert(`Entering ${skin} Chat`);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        chatList.removeChild(newChatItem);
    });

    newChatItem.appendChild(deleteBtn);
    return newChatItem;
}

// Smooth scrolling for the content section
document.querySelector('.chat-header').addEventListener('click', () => {
    document.querySelector('.chat-container').scrollIntoView({ behavior: 'smooth' });
});

// Enhance button hover effect with scale transformation
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)';
        button.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    });
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = 'none';
    });
});

// Modal closing functionality with fade-out effect
const closeModalBtns = document.querySelectorAll('.close-modal');
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        skinSelectionModal.classList.add('hidden');
        skinSelectionModal.classList.remove('fadeIn');
    });
});
