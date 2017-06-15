db.createUser(
    {
        user:'super',
        pwd:'123456',
        roles:[{role:"readWriteAnyDatabase",db:"admin"}]
    }
)