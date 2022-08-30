let selectedFile;
console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data=[{
    "name":"jayanth",
    "data":"scd",
    "abc":"sdef"
}]


document.getElementById('button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if(selectedFile){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
         let data = event.target.result;
         let workbook = XLSX.read(data,{type:"binary"});
         console.log(workbook);
         workbook.SheetNames.forEach(sheet => {
              let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]).filter(rowObject => !!rowObject.__EMPTY_3);

              console.log(rowObject);


              rowObject.map((val) => {
                console.log(val.__EMPTY_3);

                const numbers = String(val.__EMPTY_3).trim().split(' ');

                numbers.forEach(number => {
                  document.getElementById("jsondata").innerHTML += `
                  <tr>
                    <td>${val.__EMPTY_2}</td>
                    <td>${String(number).replace('-', '')}</td>
                    <td><a class="btn btn-zap" href="//api.whatsapp.com/send?phone=55${String(number).replace('-', '')}&text=estou%20interessado%20no%20seu%20carro" target="_blank" rel="noopener noreferrer" ><img src="../zap.png"></a></td>
                  </tr>`;
                });
              })
         });
        }
    }else {
      alert('Selecione o arquivo');
    }
});

