// Mapeamento das perguntas para o PDF/Excel
const questionMap = {
  'nome_completo': 'Nome completo:',
  'idade': 'Idade:',
  'cidade_mora': 'Cidade onde mora:',
  'Está_estudando_atualmente?_Se_sim,_qual_curso_e_periodo?': 'Está estudando atualmente? Se sim, qual curso e período?',
  'Possui_disponibilidade_para_trabalhar_presencialmente_em_Nova_Lima_-_MG?': 'Possui disponibilidade para trabalhar presencialmente em Nova Lima - MG?',

  'Como_ficou_sabendo_dessa_oportunidade?': 'Como ficou sabendo dessa oportunidade?',

  'Voce_gosta_de_resolver_problemas_ou_prefere_seguir_processos_ja_definidos?': 'Você curte resolver problemas ou prefere seguir processos já definidos?',

  'trabaPrefere_trabalhar_sozinho_ou_em_equipe?lhar_sozinho_equipe': 'Prefere trabalhar sozinho ou em equipe?',

  'motivacaoO_que_te_motiva_a_querer_estagiar_na_area_de_suporte_tecnico?_estagio': 'O que te motiva a querer estagiar na área de suporte técnico?',

  'sistemas_operacionaisQuais_sistemas_operacionais_voce_ja_usou?_(Windows,_Linux,_macOS...)': 'Quais sistemas operacionais você já usou? (Windows, Linux, macOS...)',

  'instaJa_instalou_programas_ou_lidou_com_algum_problema_tecnico?_Conte_uma_experiencia.ou_programas_problema': 'Já instalou programas ou lidou com algum problema técnico? Conta uma experiência.',

  'Ja_formatou_um_computador_ou_mexeu_em_configuracoes_de_rede?formatou_computador_rede': 'Já formatou um computador ou mexeu em configuração de rede?',
  'wifiSabe_diferenciar_Wi-Fi_de_Ethernet?_Ja_teve_que_configurar_ou_diagnosticar_uma_conexao?_ethernet': 'Sabe diferenciar Wi-Fi de Ethernet? Já teve que configurar ou diagnosticar uma conexão?',

  'progQuais_programas_voce_domina?_(Ex:_Word,_Excel,_antivirus,_navegadores,_etc.)ramas_domina': 'Quais programas você domina? (Ex: Word, Excel, antivírus, navegadores, etc.)',

  'Ja_usou_ferramentas_de_acesso_remoto,_como_AnyDesk_ou_TeamViewer?so_remoto': 'Já usou ferramentas de acesso remoto, como AnyDesk ou TeamViewer?',

  'Ja_ouviu_falar_de_sistemas_de_chamados?_Se_sim,_qual?': 'Já ouviu falar de sistemas de chamados? Se sim, qual?',

  'Tem_nocoes_de_seguranca_digital?_(Ex:_senhas_fortes,_phishing,_backups...)a_digital': 'Tem noções de segurança digital? (ex: senhas fortes, phishing, backups...)',

  'De_1_a_5,_como_voce_avalia_seu_nivel_atual_de_conhecimento_em_informatica?onhecimento_informatica': 'De 1 a 5, como você avalia seu nível atual de conhecimento em informática?',

  'Qual_area_da_tecnologia_voce_tem_mais_curiosidade_ou_gostaria_de_aprender?': 'Qual área da tecnologia você tem mais curiosidade ou gostaria de aprender?',

  'Esta_fazendo_algum_curso_ou_treinamento_de_TI_atualmente?_Qual?': 'Está fazendo algum curso ou treinamento de TI atualmente? Qual?',

  'Ja_passou_por_alguma_situacao_dificil_relacionada_a_tecnologia?_Como_lidou_com_isso?': 'Já passou por alguma situação difícil relacionada à tecnologia? Como lidou com isso?',

  'Se_tivesse_que_explicar_para_alguem_leigo_o_que_e_“formatar_um_computador”,_como_explicaria?': 'Se tivesse que explicar para alguém leigo o que é “formatar um computador”, como explicaria?',
  
  'Deixe_aqui_uma_mensagem_final_para_a_equipe_—_pode_ser_um_comentario,_sugestao_ou_por_que_voce_deveria_ser_escolhido(a)!': 'Deixe aqui uma mensagem final para a equipe — pode ser um comentário, sugestão ou por que você deveria ser escolhido(a)! '
};

// Captura o formulário pelo ID correto
const form = document.getElementById('formulario');

// Função para recuperar dados salvos no localStorage
function getSavedFormData() {
  const savedData = localStorage.getItem('formData');
  return savedData ? JSON.parse(savedData) : null;
}

// Evento submit do formulário
form.addEventListener('submit', (event) => {
  // Salva os dados no localStorage
  const formData = new FormData(form);
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  localStorage.setItem('formData', JSON.stringify(data));

  // Não prevenir o envio normal para Netlify (remova event.preventDefault())

  alert('Formulário enviado com sucesso!');
  // O formulário será enviado normalmente para Netlify
});

// Exportar para PDF
document.getElementById('exportPdf')?.addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const data = getSavedFormData();

  if (!data || Object.keys(data).length === 0) {
    alert('Nenhum dado de formulário encontrado para exportar. Preencha e envie o formulário primeiro.');
    return;
  }

  let y = 10;
  doc.setFontSize(12);
  doc.text("Respostas do Formulário", 10, y);
  y += 10;

  Object.entries(data).forEach(([key, value]) => {
    const questionText = questionMap[key] || formatLabel(key);
    const texto = `${questionText} ${value}`;

    if (y > 280) {
      doc.addPage();
      y = 10;
    }

    const splitText = doc.splitTextToSize(texto, 180);
    doc.text(splitText, 10, y);
    y += (splitText.length * 7);
  });

  doc.save("formulario.pdf");
});

// Exportar para Excel
document.getElementById('exportExcel')?.addEventListener('click', () => {
  const data = getSavedFormData();

  if (!data || Object.keys(data).length === 0) {
    alert('Preencha e envie o formulário antes de exportar.');
    return;
  }

  const dataArray = Object.entries(data).map(([key, value]) => ({
    Campo: questionMap[key] || formatLabel(key),
    Resposta: value
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataArray, { header: ["Campo", "Resposta"] });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Formulario");

  XLSX.writeFile(workbook, "formulario.xlsx");
});

// Limpar dados salvos
document.getElementById('clearData')?.addEventListener('click', () => {
  localStorage.removeItem('formData');
  form.reset();
  alert('Dados do formulário salvos foram limpos!');
});

// Função para formatar labels caso queira
function formatLabel(campo) {
  return campo
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}
