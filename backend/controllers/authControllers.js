const User = require ("../model/User");
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');




const back = (req,res) => {
    res.send("backend is working");
}

const test = (req,res)=>{
    console.log(req.body);
    res.json({
        message:"data recived",
        data:req.body,
    })
}

const registerUser =  async (req,res) => {
    try{
    const {name,email,password} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
       return res.status(401).json({message:"email already existed"});

    }

    // const user = new User ({name,email,password});
    // await user.save();
    const salt = await bcrypt.genSalt(10);
    console.log(req.body);
    console.log(password)
    const hashedPassword = await bcrypt.hash(password,salt);
    const user = new User({
        name,
        email,
        password:hashedPassword
    })
    await user.save();


    
    res.status(201).json({message:"user registered successfully"})

    }catch(err){
        res.status(500).json({message:err.message});

    }

}

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});

        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"password does not match"});

        }
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT,
            {expiresIn:"1h"}
        );
                res.status(200).json({message:"login successfull",token:token});


    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const profile = async (req,res) =>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {back,test,registerUser,loginUser,profile};