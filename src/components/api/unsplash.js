import axios from "axios";

export default axios.create({
    baseURL: "https://api.unsplash.com",
    headers: {
        Authorization:
            "Client-ID 0swmL3nv8dazLh42kAr2eHn3t0ApL7g5IgFKSMmjFcM"
    }
});
