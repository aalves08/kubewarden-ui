import PolicyModel from '../plugins/policy-class';

export default class ClusterAdmissionPolicy extends PolicyModel {
  get _availableActions() {
    const out = super._availableActions;

    // remove edit actions for KW default policies
    const filteredActions = out.filter((act) => {
      if (this.isKubewardenDefaultPolicy) {
        return act.action !== 'goToEdit' && act.action !== 'goToEditYaml';
      }

      return act;
    });

    if (this.isKubewardenDefaultPolicy) {
      const defaultPolicySettings = {
        action:  'editPolicySettings',
        icon:    'icon icon-edit',
        label:   'Edit Policy Settings',
      };

      filteredActions.unshift(defaultPolicySettings);
    }

    return filteredActions;
  }

  editPolicySettings() {
    this.currentRouter().push(this.kubewardenDefaultsRoute);
  }

  get source() {
    if (this.isKubewardenDefaultPolicy) {
      return 'Default Policy';
    }

    // right now we are adding 'artifacthub/pkg' anontation
    // so that we can fetch the questions info from there
    // that only happens for template based CAP's
    // https://github.com/rancher/kubewarden-ui/issues/682
    if (this.metadata?.annotations?.['artifacthub/pkg']) {
      return 'Template';
    }

    return 'Custom';
  }
}
