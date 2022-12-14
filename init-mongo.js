db.createUser(
    {
        user: "ebportal",
        pwd: "iWzW22ePDooEB",
        roles: [
            {
                role: "readWrite",
                db: "eb_database"
            }
        ]
    }
);