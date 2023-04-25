
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
        .then((data) => {
          console.log(data);
          result.innerText = "The selected file uploaded to Cloudinary!";
          result.style.color = "green";
          console.log(data.url.toString());
          
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