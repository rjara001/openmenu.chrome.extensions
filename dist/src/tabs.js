"use strict";
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        // Remove 'active' class from all buttons and hide all tab contents
        tabButtons.forEach((btn) => btn.classList.remove('active'));
        // tabContents.forEach((content) => (content.style.display = 'none'));
        // Add 'active' class to the clicked button and display the corresponding tab content
        button.classList.add('active');
        if (tabId) {
            let elem = document.getElementById(tabId);
            if (elem !== null && elem !== undefined) {
                elem.style.display = 'block';
            }
        }
    });
});
