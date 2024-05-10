<script>
import { BCollapse } from 'bootstrap-vue';
import uniqueId from 'lodash/uniqueId';
import { GlCollapseToggleDirective } from '../../../directives/collapse_toggle';
import GlButton from '../button/button.vue';

export default {
  name: 'GlAccordionItem',
  components: {
    BCollapse,
    GlButton,
  },
  directives: {
    GlCollapseToggle: GlCollapseToggleDirective,
  },
  inject: ['accordionSetId', 'defaultHeaderLevel'],
  inheritAttrs: false,
  model: {
    prop: 'visible',
    event: 'input',
  },
  props: {
    /**
     * Used to set the title of accordion link
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * Used to set the title of accordion link when the content is visible
     * */
    titleVisible: {
      type: String,
      default: null,
      required: false,
    },
    /**
     * When set, it will ensure the accordion item is initially visible
     */
    visible: {
      type: Boolean,
      default: false,
      required: false,
    },
    /**
     * The header tag used in the accordion (h1/h2/h3/h4/h5/h6). This overrides the value provided by GlAccordion. For accessibility this should be set to an appropriate value in the context where the accordion is used.,
     */
    headerLevel: {
      type: Number,
      required: false,
      default: null,
      validator(value) {
        return value > 0 && value <= 6;
      },
    },
    /**
     * Additional CSS class(es) to be applied to the header
     */
    headerClass: {
      type: [String, Object, Array],
      required: false,
      default: '',
    },
  },
  data() {
    return {
      accordionItemId: uniqueId('accordion-item-'),
      isVisible: this.visible,
    };
  },
  computed: {
    headerComponent() {
      const level = this.headerLevel || this.defaultHeaderLevel();
      return `h${level}`;
    },
    accordion() {
      return this.accordionSetId() || undefined;
    },
    icon() {
      return this.isVisible ? 'chevron-down' : 'chevron-right';
    },
    buttonTitle() {
      return this.isVisible && this.titleVisible ? this.titleVisible : this.title;
    },
  },
  watch: {
    isVisible: {
      immediate: true,
      handler(isVisible) {
        this.$emit('input', isVisible);
      },
    },
  },
};
</script>

<template>
  <div class="gl-accordion-item">
    <component :is="headerComponent" class="gl-accordion-item-header" :class="headerClass">
      <gl-button
        v-gl-collapse-toggle="accordionItemId"
        variant="link"
        button-text-classes="gl-display-flex"
        :icon="icon"
      >
        {{ buttonTitle }}
      </gl-button>
    </component>
    <b-collapse
      :id="accordionItemId"
      v-model="isVisible"
      :visible="isVisible"
      :accordion="accordion"
      class="gl-mt-3 gl-font-base"
      :data-testid="`accordion-item-collapse-${accordionItemId}`"
    >
      <!-- @slot Item content -->
      <slot></slot>
    </b-collapse>
  </div>
</template>
