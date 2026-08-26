import pageStyles from './Page.module.css';
import { Binding } from './Binding';
import { PageTitle } from './PageTitle';

export function Resume() {
  return (
    <div className={pageStyles.desk}>
      <div className={pageStyles.notebook}>
        <div className={pageStyles.front}>
          <Binding />
          <div className={pageStyles.paper}>
            <PageTitle title="i do have experiences" />
          </div>
        </div>
      </div>
    </div>
  );
}
