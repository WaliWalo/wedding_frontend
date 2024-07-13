export const createUser = async (firstName, lastName) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "firstName": firstName,
    "lastName": lastName,
    "weddingId": "659cfdc8ef6b5b99ee54d605",
    "accepted": false
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    try {
        const response = await fetch("https://wedding-backend-weld.vercel.app/api/users/659cfdc8ef6b5b99ee54d605", requestOptions);
        const result = await response.text();
        if(response.ok){
            return result;
        }else{
            return null;
        }
    } catch (error) {
        console.error(error);
    };
}

export const getAllImages = async () => {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      try {
        const response = await fetch("https://wedding-backend-weld.vercel.app/api/galleries", requestOptions);
        const result = await response.text();
        const parseResult = JSON.parse(result);
        if(typeof parseResult.resources === "undefined"){
            parseResult.resources = [];
        }
        return parseResult;
      } catch (error) {
        console.error(error);
      };
}

export const deleteImageById = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
    "public_id": id,
    });
    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
        body: raw
      };
      
      try {
        const response = await fetch(`https://wedding-backend-weld.vercel.app/api/galleries/cloudinary/`, requestOptions);
        const result = await response.text();
        return JSON.parse(result);
      } catch (error) {
        console.error(error);
      };
}