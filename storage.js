let UsuarioLogEl = document.getElementById('UsuarioLog');
let SenhaLogEl = document.getElementById('SenhaLog');
let UsuarioInsEl = document.getElementById('UsuarioIns');
let SenhaInsEl = document.getElementById('SenhaIns');
let CSenhaInsEl = document.getElementById('CSenhaIns');
let EnviarIns = document.getElementById('enviar2');
let x = localStorage.getItem('senha', SenhaIns);
let y = localStorage.getItem('confirmacaoSenha', CSenhaIns);

EnviarIns.addEventListener('click',salvaLogin);

function salvaLogin(){
let UsuarioIns = UsuarioInsEl.value;
let SenhaIns = SenhaInsEl.value;
let CSenhaIns = CSenhaInsEl.value;
localStorage.setItem('usuario', UsuarioIns);
localStorage.setItem('senha', SenhaIns);
localStorage.setItem('confirmacaoSenha', CSenhaIns);
x =  localStorage.getItem('senha', SenhaIns);
y = localStorage.getItem('confirmacaoSenha', CSenhaIns);
document.getElementById('senhaIncorreta').innerHTML = '';
if(x == y){
  document.getElementById('senhaIncorreta').innerHTML = "<p style = 'color:green'>Conta criada,clique em voltar.</p>";
}else{document.getElementById('senhaIncorreta').innerHTML = "<p style = 'color:red'>As senhas não são idênticas.</p>";}
}
function inscrever(){
  $('#logar-mensagem').toggleClass('modal-visivel');
  $('#logar-conteudo').toggleClass('trans-conteudo');
  $('#inscrever-mensagem').toggleClass('modal-visivel');
  $('#inscrever-conteudo').toggleClass('trans-conteudo');
}
