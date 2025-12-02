export const userFormSchema = {
    fields: [
      { name: "email", type: "text", label: "Adresse email", placeholder: "...", rules: "required|email" },
      { name: "name", type: "text", label: "Nom complet", placeholder: "...", rules: "required|min:2" }
    ]
  }