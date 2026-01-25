const fetch = require('node-fetch');

async function testRegistration() {
    const PORT = process.env.PORT || 5000;
    const BASE_URL = `http://localhost:${PORT}/api/registered`;

    const testUser = {
        user_id: "test_user_789",
        event_name: "Hackathon 2026",
        name: "John Doe",
        team_name: "The Avengers",
        team_members: "Tony, Steve, Natasha"
    };

    try {
        console.log("1. Registering new user with team info...");
        let res = await fetch(`${BASE_URL}/register-event`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        let data = await res.json();
        console.log("Response:", JSON.stringify(data, null, 2));

        console.log("\n2. Updating team info for existing user...");
        const updateInfo = {
            user_id: "test_user_789",
            event_name: "Hackathon 2026",
            team_name: "Justice League",
            team_members: "Clark, Bruce, Diana"
        };
        res = await fetch(`${BASE_URL}/register-event`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateInfo)
        });
        data = await res.json();
        console.log("Response:", JSON.stringify(data, null, 2));

        console.log("\n3. Fetching registered events and verifying team info...");
        res = await fetch(`${BASE_URL}/registered-events?user_id=test_user_789`);
        data = await res.json();
        console.log("Response:", JSON.stringify(data, null, 2));

        if (data.team_name === "Justice League" && data.team_members === "Clark, Bruce, Diana") {
            console.log("\nSUCCESS: Team fields verified correctly!");
        } else {
            console.log("\nFAILURE: Team fields do not match expected values.");
        }

    } catch (error) {
        console.error("Test failed:", error);
    }
}

testRegistration();
