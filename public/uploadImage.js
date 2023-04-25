
function displayImage() {

  try {
    const preview = document.querySelector("#preview");
    const file = document.querySelector("#invoice").files[0];
    const result = document.querySelector(".result");
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        preview.style.display="flex"
        preview.src = reader.result;
      },
      false
    );
    if (file.type.startsWith("image/")) {
      result.innerText = "Loading.....";
      result.style.color = "red";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "acahsimages");
      data.append("cloud_name", "acahscollege");

      console.log(data);
      fetch(
        "https://api.cloudinary.com/v1_1/acahscollege/image/upload/",
        {
          method: "post",
          body: data,
        }
      )
        .then((res) => res.json())
        .then(async(data) => {
          console.log(data);
          // result.innerText = "<p>The selected file uploaded to Cloudinary!</p>";
          // result.style.color = "green";
          console.log("https://api.ocr.space/parse/imageurl?apikey=K87960241388957&url="+data.url.toString());
          
          var result = await requestor(
            "GET",
            "https://api.ocr.space/parse/imageurl?apikey=K87960241388957&url="+data.url.toString()
          );
          data = JSON.parse(result);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          
        });
    } else {
      result.innerText = "The selected file is not an image.";
    }
    if (file) {
      reader.readAsDataURL(file);
    }
  } catch (err) {
    console.log(err);
  }
}