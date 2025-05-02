import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";



export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="Admin Dashboard Template"
        description="Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="" />
      <div className="space-y-6">
        <ComponentCard title="Users">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}



