document.getElementById("listazz").onclick = esemenyLista;

async function esemenyLista(){
    //ki kell olvasni ertekeket
    const response = await fetch("/esemenyek");
    const esemeny = await response.json();
    

}