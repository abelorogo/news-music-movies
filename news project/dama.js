// dama.js

document.getElementById('donationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const amount = document.getElementById('amount').value;
    const message = document.getElementById('message').value;

    const donation = {
        name,
        email,
        amount,
        message,
        date: new Date().toLocaleString()
    };

    // Store in general donations list
    let donations = JSON.parse(localStorage.getItem('donations')) || [];
    donations.push(donation);
    localStorage.setItem('donations', JSON.stringify(donations));

    // Store the latest donation separately
    localStorage.setItem('latestDonation', JSON.stringify(donation));

    alert('Thank you for your donation!');
    document.getElementById('donationForm').reset();
    
    window.location.href = 'donation-detail.html'; // Redirect to the donation detail page
});
