const getAllusers=(req,res)=>{
    res.send("All user fetched");
};

const signup=(req,res)=>{
    res.send("Singing Up");
};

const login=(req,res)=>{
    res.send("Logging in");
}

// crud operation

const getUserProfile=(req,res)=>{
    res.send("profile fetched");
};

const updateUserProfile=(req,res)=>{
    res.send("profile updated");
};

const deleteUserProfile=(req,res)=>{
    res.send("profile deleted");
};

//All functionality exported below
module.exports={
    getAllusers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
}