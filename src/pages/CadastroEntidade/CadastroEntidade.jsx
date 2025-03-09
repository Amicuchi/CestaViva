import { useCallback, useEffect, useState } from "react";
import axios from "../../services/axiosConfig";
import ModalTermo from "./components/ModalTermo";
import InputMask from "react-input-mask";
import * as yup from "yup";
import "./CadastroEntidade.css";

const tiposEntidade = [
  "Abrigos para Pessoas em Situação de Rua",
  "APAE",
  "Associações de Moradores",
  "Bancos de Alimentos",
  "Casas de Repouso",
  "Centro Espírita",
  "Clínicas de Reabilitação",
  "Coletivos de Apoio a Pessoas em Situação de Vulnerabilidade",
  "Cooperativas de Pequenos Agricultores",
  "Creches e Pré-Escolas Sociais",
  "Escolas Públicas e Comunitárias",
  "Fundações de Apoio a Crianças e Idosos",
  "Hospitais",
  "Igreja",
  "Instituições de Assistência Social",
  "Instituições de Ensino para Pessoas com Deficiência",
  "Mesquita",
  "Movimentos de Economia Solidária",
  "ONGs de Apoio a Famílias em Vulnerabilidade",
  "Orfanatos",
  "Postos de Saúde",
  "Projetos de Agricultura Familiar",
  "Projetos de Combate à Fome",
  "Redes de Voluntariado",
  "Sinagoga",
  "Templo Budista",
].sort();

const validateCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/[^\d]/g, "");

  if (cnpj.length !== 14) return false;

  let soma = 0;
  let peso = 2;

  for (let i = 11; i >= 0; i--) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }

  let digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  soma = 0;
  peso = 2;

  for (let i = 12; i >= 0; i--) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }

  let digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  return (
    parseInt(cnpj.charAt(12)) === digito1 &&
    parseInt(cnpj.charAt(13)) === digito2
  );
};

export default function CadastroEntidade() {
  const [formData, setFormData] = useState({
    cnpj: "",
    razaoSocial: "",
    nomeFantasia: "",
    enderecoRua: "",
    enderecoNum: "",
    enderecoComp: "",
    enderecoBairro: "",
    enderecoCidade: "",
    enderecoEstado: "",
    enderecoCep: "",
    nomeResponsavel: "",
    telefoneResponsavel: "",
    email: "",
    senha: "",
    senha2: "",
    tipoEntidade: "",
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [open, setOpen] = useState(false);

  const buscaCEP = useCallback(async (cep) => {
    const cleanCEP = cep.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cleanCEP.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cleanCEP}/json/`
        );

        const { logradouro, bairro, localidade, uf } = response.data;

        setFormData((prev) => ({
          ...prev,
          enderecoRua: logradouro,
          enderecoBairro: bairro,
          enderecoCidade: localidade,
          enderecoEstado: uf,
        }));
        // Limpa qualquer erro de CEP anterior
      } catch (error) {
        console.error("Erro ao buscar CEP", error);
        setErrors((prev) => ({
          ...prev,
          enderecoCep: "Erro ao buscar CEP",
        }));
      }
    }
  }, []);

  const buscaCNPJ = useCallback(async (cnpj) => {
    const cleanCNPJ = cnpj.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cleanCNPJ.length === 14) {
      try {
        const response = await axios.get(
          `https://brasilapi.com.br/api/cnpj/v1/${cleanCNPJ}`
        );
        if (response.data && !response.data.error) {
          const {
            razao_social,
            nome_fantasia,
            logradouro,
            numero,
            complemento,
            bairro,
            municipio,
            uf,
            cep,
            email,
            ddd_telefone_1,
          } = response.data;

          setFormData((prev) => ({
            ...prev,
            razaoSocial: razao_social,
            nomeFantasia: nome_fantasia || razao_social,
            enderecoRua: logradouro,
            enderecoNum: numero || "",
            enderecoComp: complemento || "",
            enderecoBairro: bairro,
            enderecoCidade: municipio,
            enderecoEstado: uf,
            enderecoCep: cep.replace(/\D/g, ""),
            email: email || "",
            telefoneResponsavel: ddd_telefone_1 || "",
          }));

          // Limpa mensagens de erro relacionadas ao CNPJ
          setErrors((prev) => ({ ...prev, cnpj: "" }));
        } else {
          setErrors((prev) => ({
            ...prev,
            cnpj: "CNPJ não encontrado ou inválido",
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CNPJ", error);
        setErrors((prev) => ({
          ...prev,
          cnpj: "Erro ao buscar CNPJ",
        }));
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Se o campo for CNPJ, Telefone ou CEP, remove caracteres não numéricos
    if (["cnpj", "telefoneResponsavel", "enderecoCep"].includes(name)) {
      formattedValue = value.replace(/\D/g, "");
    }

    // Adapta a máscara do telefone dinamicamente
    if (name === "telefoneResponsavel") {
      formattedValue = formattedValue.replace(
        /^(\d{2})(\d{4,5})(\d{4})$/,
        "($1)$2-$3"
      );
    }
    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Dispara a busca ao preencher um CNPJ válido
    if (name === "cnpj" && formattedValue.length === 14) {
      buscaCNPJ(formattedValue);
    } else if (name === "enderecoCep" && formattedValue.length === 8) {
      // Se for um CEP válido, busca automaticamente o endereço
      buscaCEP(formattedValue);
    }
  };

  // useEffect para formatar o telefone após ele ser atualizado
  useEffect(() => {
    if (formData.telefoneResponsavel) {
      const formattedPhone = formData.telefoneResponsavel.replace(
        /^(\d{2})(\d{4,5})(\d{4})$/,
        "($1)$2-$3"
      );
      setFormData((prev) => ({
        ...prev,
        telefoneResponsavel: formattedPhone,
      }));
    }
  }, [formData.telefoneResponsavel]);

  const validationSchema = yup.object().shape({
    cnpj: yup
      .string()
      .test("is-valid-cnpj", "CNPJ inválido", (value) =>
        validateCNPJ(value.replace(/\D/g, ""))
      )
      .required("CNPJ é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    senha: yup
      .string()
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Senha deve conter letra, número e caractere especial"
      )
      .required("Senha é obrigatória"),
    senha2: yup
      .string()
      .oneOf([yup.ref("senha"), null], "As senhas não coincidem")
      .required("Confirmação de senha é obrigatória"),
    telefoneResponsavel: yup
      .string()
      .test(
        "is-valid-phone",
        "Telefone inválido",
        (value) => value.replace(/\D/g, "").length >= 10
      )
      .required("Telefone é obrigatório"),
    enderecoCep: yup
      .string()
      .test(
        "is-valid-cep",
        "CEP inválido",
        (value) => value.replace(/\D/g, "").length === 8
      )
      .required("CEP é obrigatório"),
    razaoSocial: yup.string().required("Razão Social é obrigatória"),
    enderecoNum: yup.string().required("Número é obrigatório"),
    nomeResponsavel: yup.string().required("Nome do Responsável é obrigatório"),
    tipoEntidade: yup.string().required("Selecione o tipo de entidade"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      if (!acceptedTerms) {
        setErrors({ terms: "Termos de uso devem ser aceitos" });
        return;
      }

      // Prepara dados para envio
      const dadosParaEnvio = {
        cnpj: Number(formData.cnpj.replace(/\D/g, "")), // Remove caracteres não numéricos
        razaoSocial: formData.razaoSocial,
        nomeFantasia: formData.nomeFantasia || formData.razaoSocial,
        cep: Number(formData.enderecoCep.replace(/\D/g, "")),
        endereco: formData.enderecoRua,
        numero: Number(formData.enderecoNum),
        complemento: formData.enderecoComp || "",
        bairro: formData.enderecoBairro,
        cidade: formData.enderecoCidade,
        estado: formData.enderecoEstado,
        telefone: Number(formData.telefoneResponsavel.replace(/\D/g, "")),
        tipoEntidade: formData.tipoEntidade,
        usuario: {
          nome: formData.nomeResponsavel,
          email: formData.email,
          senha: formData.senha,
        },
      };

      // Remove campos não necessários
      delete dadosParaEnvio.senha2;

      const response = await axios.post("/entidades", dadosParaEnvio);

      if (response.status === 201) {
        setSuccessMessage("Cadastro realizado com sucesso!");

        setFormData({
          cnpj: "",
          razaoSocial: "",
          nomeFantasia: "",
          enderecoRua: "",
          enderecoNum: "",
          enderecoComp: "",
          enderecoBairro: "",
          enderecoCidade: "",
          enderecoEstado: "",
          enderecoCep: "",
          nomeResponsavel: "",
          telefoneResponsavel: "",
          email: "",
          senha: "",
          senha2: "",
          tipoEntidade: "",
        });
        setAcceptedTerms(false);
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const errorMessages = {};
        error.inner.forEach((err) => {
          errorMessages[err.path] = err.message;
        });
        setErrors(errorMessages);
      } else if (error.response) {
        console.error("Erro no backend:", error.response.data);
        setErrors({
          backend: error.response.data.message || "Erro ao realizar o cadastro",
        });
      } else {
        console.error("Erro inesperado:", error);
        setErrors({
          backend: "Erro inesperado ao tentar realizar o cadastro",
        });
      }
    }
  };

  return (
    <main className="CEContainer">
      <h1>Cadastro de Entidade</h1>
      <form className="CEForm" onSubmit={handleSubmit}>
        <InputMask
          mask="99.999.999/9999-99"
          maskChar=""
          className={`CEInput ${errors.cnpj ? "input-error" : ""}`}
          name="cnpj"
          placeholder="CNPJ"
          value={formData.cnpj}
          onChange={handleChange}
          required
        />
        {errors.cnpj && <p className="error-text">{errors.cnpj}</p>}

        <input
          className={`CEInput ${errors.razaoSocial ? "input-error" : ""}`}
          type="text"
          name="razaoSocial"
          placeholder="Razão Social"
          value={formData.razaoSocial}
          onChange={handleChange}
          required
        />
        {errors.razaoSocial && (
          <p className="error-text">{errors.razaoSocial}</p>
        )}

        <input
          className="CEInput"
          type="text"
          name="nomeFantasia"
          placeholder="Nome Fantasia"
          value={formData.nomeFantasia}
          onChange={handleChange}
        />

        <select
          className={`CESelect ${errors.tipoEntidade ? "input-error" : ""}`}
          name="tipoEntidade"
          value={formData.tipoEntidade}
          onChange={handleChange}
          required
        >
          <option value="" className="CESelect">
            Selecione o tipo de entidade
          </option>
          {tiposEntidade.map((tipo, index) => (
            <option key={index} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
        {errors.tipoEntidade && (
          <p className="error-text">{errors.tipoEntidade}</p>
        )}

        <InputMask
          mask="99999-999"
          maskChar=""
          className={`CEInput ${errors.enderecoCep ? "input-error" : ""}`}
          type="text"
          name="enderecoCep"
          placeholder="CEP"
          value={formData.enderecoCep}
          onChange={handleChange}
          required
        />
        {errors.enderecoCep && (
          <p className="error-text">{errors.enderecoCep}</p>
        )}

        <input
          className="CEInput"
          type="text"
          name="enderecoRua"
          placeholder="Logradouro (Rua, Av, Travessa, etc)"
          value={formData.enderecoRua}
          onChange={handleChange}
          required
        />

        <input
          className="CEInput"
          type="text"
          name="enderecoNum"
          placeholder="Número"
          value={formData.enderecoNum}
          onChange={handleChange}
          required
        />

        <input
          className="CEInput"
          type="text"
          name="enderecoComp"
          placeholder="Complemento"
          value={formData.enderecoComp}
          onChange={handleChange}
        />

        <input
          className="CEInput"
          type="text"
          name="enderecoBairro"
          placeholder="Bairro"
          value={formData.enderecoBairro}
          onChange={handleChange}
          required
        />

        <input
          className="CEInput"
          type="text"
          name="enderecoCidade"
          placeholder="Cidade"
          value={formData.enderecoCidade}
          onChange={handleChange}
          required
        />

        <input
          className="CEInput"
          type="text"
          name="enderecoEstado"
          placeholder="Estado"
          value={formData.enderecoEstado}
          onChange={handleChange}
          required
        />

        <input
          className={`CEInput ${errors.email ? "input-error" : ""}`}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <input
          className="CEInput"
          type="text"
          name="nomeResponsavel"
          placeholder="Nome do Responsável"
          value={formData.nomeResponsavel}
          onChange={handleChange}
          required
        />

        <InputMask
          maskChar=""
          className={`CEInput ${
            errors.telefoneResponsavel ? "input-error" : ""
          }`}
          type="tel"
          name="telefoneResponsavel"
          placeholder="Telefone do Responsável"
          value={formData.telefoneResponsavel}
          onChange={handleChange}
          required
        />

        <input
          className={`CEInput ${errors.senha ? "input-error" : ""}`}
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          required
        />
        {errors.senha && <p className="error-text">{errors.senha}</p>}

        <input
          className={`CEInput ${errors.senha2 ? "input-error" : ""}`}
          type="password"
          name="senha2"
          placeholder="Confirme sua Senha"
          value={formData.senha2}
          onChange={handleChange}
          required
        />
        {errors.senha2 && <p className="error-text">{errors.senha2}</p>}

        {/* Checkbox de termos */}
        <div className="CEInput termo-checkbox" name="termo">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={() => setAcceptedTerms(!acceptedTerms)}
          />
          <label htmlFor="terms">
            Eu li e aceito os{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setOpen(true)}
            >
              termos de uso
            </span>
          </label>
        </div>
        {errors.terms && <p className="error-text">{errors.terms}</p>}

        {/* Mensagens de sucesso e erro geral */}
        {successMessage && (
          <p style={{ color: "green" }} className="successMessage">
            {successMessage}
          </p>
        )}
        {errors.backend && (
          <p style={{ color: "red" }} className="errorMessage">
            {errors.backend}
          </p>
        )}

        <button className="ButtonTotal" type="submit" name="CEbutton">
          Cadastrar
        </button>
      </form>

      <ModalTermo open={open} handleClose={() => setOpen(false)} />
    </main>
  );
}
