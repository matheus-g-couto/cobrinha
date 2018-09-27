$("#abrir-modal").click(logar);
$(".closer").click(logar);

function logar(){
  $("#logar").toggleClass("modal-visivel");
  $(".central").toggleClass("desfoque");
  $(".minhoca").toggleClass("desfoque");
  $(".componentes").toggleClass("desfoque");
  $(".fontes").toggleClass("desfoque");
  $(".modal-conteudo").toggleClass("trans-conteudo");
}

function inscrever(){
  
}
