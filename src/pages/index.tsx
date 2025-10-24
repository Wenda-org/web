import { useEffect } from "react";

// const RedirectToHTML = () => {
//   useEffect(() => {
//     window.location.href = "/index.html"; // caminho para o HTML
//   }, []);

//   return null;
// };
const RedirectToHTML = () => {
  return (
    <iframe
      src="/landing.html"
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
        display: "block"
      }}
      title="Página Inicial"
    />
  );
};

export default RedirectToHTML;
