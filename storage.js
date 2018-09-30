let UsuarioLogEl = document.getElementById('UsuarioLog');
let SenhaLogEl = document.getElementById('SenhaLog');
let UsuarioInsEl = document.getElementById('UsuarioIns');
let SenhaInsEl = document.getElementById('SenhaIns');
let CSenhaInsEl = document.getElementById('CSenhaIns');
let EnviarIns = document.getElementById('enviar2');
let EnviarLog = document.getElementById('enviar1');
let x = localStorage.getItem('senha', SenhaIns);
let y = localStorage.getItem('confirmacaoSenha', CSenhaIns);
let z = localStorage.getItem('usuario',UsuarioIns);
EnviarIns.addEventListener('click',salvaLogin);
EnviarLog.addEventListener('click',entraJogo);

function salvaLogin(){
let UsuarioIns = UsuarioInsEl.value;
let SenhaIns = SenhaInsEl.value;
let CSenhaIns = CSenhaInsEl.value;
localStorage.setItem('usuario', UsuarioIns);
localStorage.setItem('senha', SenhaIns);
localStorage.setItem('confirmacaoSenha', CSenhaIns);
x =  localStorage.getItem('senha', SenhaIns);
y = localStorage.getItem('confirmacaoSenha', CSenhaIns);
z = localStorage.getItem('usuario',UsuarioIns);
document.getElementById('senhaIncorreta').innerHTML = '';
if(x == y){
  document.getElementById('senhaIncorreta').innerHTML = "<p style = 'color:green'>Conta criada,clique em voltar.</p>";
}else{document.getElementById('senhaIncorreta').innerHTML = "<p style = 'color:red'>As senhas não são idênticas.</p>";}
}

function entraJogo(){
  document.getElementById('enviar1').innerHTML = 'Enviar';
  if(UsuarioLogEl.value === z && SenhaLogEl.value === x && SenhaLogEl.value === y){
    document.getElementById('enviar1').innerHTML = "<a href='jogo.html'style='margin: 0; text-decoration:none' button type='button' id='enviar1' class='input-submit'>Enviar</button></a>";
    document.getElementById('loginAprovado').innerHTML = "<p style = 'color:green'>Login aprovado,clique novamente em enviar para acessar o jogo.</p>";
  }else{document.getElementById('loginAprovado').innerHTML = "<p style = 'color:red'>Senha/Login incorreta(o).</p>";}
}
