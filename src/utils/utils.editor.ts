import { ResizeAction, ImageSpec } from 'quill-blot-formatter';

export default class CustomImageSpec extends ImageSpec {
  getActions() {
    return [ResizeAction];
  }
}
