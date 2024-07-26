import bcrypt from "bcryptjs";

export const compareRole = async (role: string, hashRole: string | undefined) => {
	if(!hashRole || !role) return false;
	try{
		const isMatch = await bcrypt.compare(role, hashRole);
		return isMatch;
	}catch(err){
		console.log(err);
		return false;
	}
}