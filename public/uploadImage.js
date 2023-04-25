const postDetails = (pics) => {
    if (!pics) {  
      alert("Please select an Image file!!");
      return 
    }
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      console.log(pics);
      
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "acahsimages");
      data.append("cloud_name", "acahscollege");

      console.log(data);
      fetch("https://api.cloudinary.com/v1_1/acahscollege/image/upload/", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        //-   setEveImage(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please select an image!");
    }
  };