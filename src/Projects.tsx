import pageStyles from './Page.module.css';
import { Binding } from './Binding';
import { PageTitle } from './PageTitle';

export function Projects() {
  return (
    <div className={pageStyles.desk}>
      <div className={pageStyles.notebook}>
        <div className={pageStyles.front}>
          <Binding />
          <div className={pageStyles.paper}>
            <PageTitle title="i do create" />
          </div>
        </div>
      </div>
    </div>
  );
}
