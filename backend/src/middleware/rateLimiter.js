import ratelimit from "../config/upstash.js";


const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-api-key");
        if (!success) {
            return res.status(429).json({ message: "Too many requests, please try again later." });
        }
        next();
    } catch (error) {
        console.error("Rate limit error:", error);
        next();
    }
}

export default rateLimiter;