$("#abrir-modal").click(logar);
$("#inscrever").click(inscrever);
$(".closer").click(logar);
$(".closer2").click(inscrever);

function logar(){
  $("#logar-mensagem").toggleClass("modal-visivel");
  $(".central").toggleClass("desfoque");
  $(".minhoca").toggleClass("desfoque");
  $(".componentes").toggleClass("desfoque");
  $(".fontes").toggleClass("desfoque");
  $("#logar-conteudo").toggleClass("trans-conteudo");
}

function inscrever(){
  $("#logar-mensagem").toggleClass("modal-visivel");
  $("#logar-conteudo").toggleClass("trans-conteudo");
  $("#inscrever-mensagem").toggleClass("modal-visivel");
  $("#inscrever-conteudo").toggleClass("trans-conteudo");
}

$componentes(){
  
}

function afogar(){

}
