import {
    renderNotFound,
} from '../../../../utils/component-extensions/component-renderer';
import { IRenderComponent } from '../interfaces/render-interface';

export class NotFoundHandler implements IRenderComponent {
    getComponent(): JSX.Element {
        return renderNotFound();
    }
}
