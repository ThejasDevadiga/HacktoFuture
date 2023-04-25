
window.addEventListener("load", () => {
    document.getElementById('userName').innerText = sessionStorage.getItem('userName')
    async function getDrugsList(){
      const Hospital = JSON.parse(sessionStorage.getItem("Hospital"))
  
      var  raw = JSON.stringify({
        requestedId:"Hello",
        filter:{Hospital},
        projection:{_id:0}
      });
    
    var  res = await requestor("POST",raw,"http://localhost:5000/api/consultant/drugs-list")
    res = JSON.parse(res)
    sessionStorage.setItem("availableDrug",JSON.stringify(res.data));
    }
    getDrugsList()
   
      async  function addDrugtoList() {
          const drugName = document.getElementById("drugName").value;
          const drugQuantity = document.getElementById("drugQuantity").value;
          const drugMorn = document.getElementById("mor").checked ? 1:0;
          const drugAftr = document.getElementById("aft").checked? 1:0;
          const drugEve = document.getElementById("eve").checked?1:0;
          const drugTiming = drugMorn+'-'+drugAftr+'-'+drugEve;
          const drugNote = document.getElementById("note").value;
          if (sessionStorage.getItem("drugList")==null){
              var drugDet = JSON.stringify(Array({drugName,drugQuantity,drugTiming,drugNote}))
                  sessionStorage.setItem("drugList",drugDet);
          }
          else{
              // Retrieve the string from session storage
              var listAsString = sessionStorage.getItem("drugList");
  
              // Convert the string back to a list of JSON objects
              var listOfObjects = JSON.parse(listAsString);
  
              // Add a new element to the list
              listOfObjects.push({drugName,drugQuantity,drugTiming,drugNote});
  
              // Convert the updated list to a string
              listAsString = JSON.stringify(listOfObjects);
  
              // Store the updated string back in session storage
            
              sessionStorage.setItem("drugList",listAsString)
              
          }
  
          // document.getElementById("alert").innerHTML = 'Drug added'
          location.reload();
       }
     
        const Drugform = document.getElementById("listDrug");
       
        Drugform.addEventListener("submit", (event) => {
         event.preventDefault();
          addDrugtoList();
       });
       
       
      });
   // ------------------------------------------------------------------
  
   
  
  
  
  