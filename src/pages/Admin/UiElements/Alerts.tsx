import PageBreadcrumb from "../../../components/Admin/common/PageBreadCrumb";
import ComponentCard from "../../../components/Admin/common/ComponentCard";
import Alert from "../../../components/Admin/ui/alert/Alert";
import PageMeta from "../../../components/Admin/common/PageMeta";

export default function Alerts() {
  return (
    <>
      <PageMeta
        title="React.js Alerts Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Alerts Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Logs" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Histórico">
          <Alert
            variant="success"
            title="Passing Toloba (244954218536)"
            message="Organização adicionada - Instituto de Pesquisa Agrícola (244222780579)"
            showLink={false}
          />
          {/* <Alert
            variant="warning"
            title="Warning Message"
            message="Be cautious when performing this action."
            showLink={false}
          /> */}
          {/* <Alert
            variant="info"
            title="Info Message"
            message="Be cautious when performing this action."
            showLink={false}
          /> */}
          <Alert
            variant="error"
            title="Passing Toloba (244954218536)"
            message="Conta desativada - Gilson Chipombo (244935626001)"
            showLink={false}
          />
        </ComponentCard>
      </div>
    </>
  );
}
