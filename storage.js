let x = localStorage.getItem('senha', $('#SenhaIns').val());
let y = localStorage.getItem('confirmacaoSenha', $('#CSenhaIns').val());
let z = localStorage.getItem('usuario', $('#UsuarioIns'));

$('#enviar1').click(entraJogo);
$('#enviar2').click(salvaLogin);

function salvaLogin(){
  localStorage.setItem('usuario', $('#UsuarioIns').val());
  localStorage.setItem('senha', $('#SenhaIns').val());
  localStorage.setItem('confirmacaoSenha', $('#CSenhaIns').val());

  x =  localStorage.getItem('senha', $('#SenhaIns').val());
  y = localStorage.getItem('confirmacaoSenha', $('#CSenhaIns').val());
  z = localStorage.getItem('usuario',$('#UsuarioIns').val());

  $('#senhaIncorreta').html('');
  if(x.length == 0 || y.length == 0 || z.length == 0){
    $('#senhaIncorreta').html("<p style = 'color:red'>Preencha todos os campos!</p>")
  } else{
    if(x == y){
      $('#senhaIncorreta').html("<p style = 'color:green'>Conta criada, clique em voltar.</p>");
    }else{ $('#senhaIncorreta').html("<p style = 'color:red'>As senhas não são idênticas.</p>");}
  }
}

function entraJogo(){
  $('#enviar1').html('Enviar');

  if($('#UsuarioLog').val() === z && $('#SenhaLog').val() === x && $('#SenhaLog').val() === y){
    $('#enviar1').html("<a href='jogo.html'style='margin: 0; text-decoration:none' button type='button' id='enviar1' class='input-submit'>Enviar</button></a>");
    $('#loginAprovado').html("<p style = 'color:green'>Login aprovado, clique novamente em enviar para acessar o jogo.</p>");
  }else{ $('#loginAprovado').html("<p style = 'color:red'>Senha/Login incorreta(o).</p>");}
}
