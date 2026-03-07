const Biodata = require("../models/Biodata");

const createBiodata = async (req,res) => {
    try {
        let {personal,education,family,horoscope,contact} = req.body;
        
        // When sending FormData, nested objects come as strings. We must parse them back.
        if (typeof personal === 'string') personal = JSON.parse(personal);
        if (typeof education === 'string') education = JSON.parse(education);
        if (typeof family === 'string') family = JSON.parse(family);
        if (typeof horoscope === 'string') horoscope = JSON.parse(horoscope);
        if (typeof contact === 'string') contact = JSON.parse(contact);

        // If an image was uploaded, save its local path
        if (req.file) {
            personal.profilePhoto = `/uploads/${req.file.filename}`;
        }

        // Grab the user ID from the decoded token securely attached by the auth middleware
        const user = req.user._id;

        const biodata = new Biodata({
            personal,
            education,
            family,
            horoscope,
            contact,
            user
        })
        await biodata.save();
        res.status(201).json({message:"Biodata created successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getMyBiodatas = async (req,res) =>{
    try {
        const biodatas = await Biodata.find({user:req.user._id});
        res.status(200).json(biodatas);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getBiodataById = async (req,res) =>{
    try {
        const biodata = await Biodata.findById(req.params.id);

        if(!biodata){
            return res.status(404).json({message:"Biodata not found"});
        }

        if(biodata.user.toString() !== req.user._id.toString()){
            return res.status(403).json({message:"You are not authorized to view this biodata"});
        }
        res.status(200).json(biodata);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const updateBiodata = async (req,res) =>{
    try {
        const biodata = await Biodata.findById(req.params.id);

        if(!biodata){
            return res.status(404).json({message:"Biodata not found"});
        }

        if(biodata.user.toString() !== req.user._id.toString()){
            return res.status(403).json({message:"You are not authorized to update this biodata"});
        }

        const personal = JSON.parse(req.body.personal);
        const education = JSON.parse(req.body.education);
        const family = JSON.parse(req.body.family);
        const horoscope = JSON.parse(req.body.horoscope);
        const contact = JSON.parse(req.body.contact);

        if(req.file){
            personal.profilePhoto = `/uploads/${req.file.filename}`;
        }else{
            personal.profilePhoto = biodata.personal.profilePhoto;
        }

        const updatedBiodata = await Biodata.findByIdAndUpdate(
            req.params.id,
            {
                personal,
                education,
                family,
                horoscope,
                contact
            },
            { returnDocument: 'after' }
        )

        if(!updatedBiodata){
            return res.status(404).json({message:"Biodata not found"});
        }

        

        res.status(200).json({message:"Biodata updated successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports = {createBiodata, getMyBiodatas, getBiodataById, updateBiodata};