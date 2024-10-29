function calc(){
     let userinput =document.getElementById("inputnumber").value;
     
     let printoutput=document.getElementById("printoutput");

     let finaloutput=eval(userinput)

     console.log(finaloutput);

     printoutput.innerHTML=finaloutput;
}