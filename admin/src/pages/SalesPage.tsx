import { Layout } from '../components/Layout/Layout';
import { GridContainer } from '../components/Grid/GridContainer';
import Spacer from '../components/ui/Spacer';

function SalesPage() {
  return (
    <Layout>
      <GridContainer fluid>
        <h1>SalesPage</h1>
        <Spacer size={24} />
      </GridContainer>
    </Layout>
  );
}

export default SalesPage;
