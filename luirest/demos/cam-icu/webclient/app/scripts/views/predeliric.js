/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/predeliric.html',
    'stickitform'
], function ($, _, Backbone, html, StickitForm) {
    'use strict';

    var PredeliricView = Backbone.View.extend({
        html: html,

        tagName: 'div',

        bindings: function () {
            var bindings = StickitForm.getBindings({
                attributes: ['isurgency','morphine','hasinfection','coma','hassedation','urea','hasacidosis','apache2'],
                extend: {
                   morphine: {
                     selectOptions: {
                       collection: [
                           {'label': 'Sem morfina', 'value': 1},
                           {'label': '0,01 - 7,1mg', 'value': 2},
                           {'label': '7,2 - 18,6mg', 'value': 3},
                           {'label': '> 18,6mg', 'value': 4}
                       ],
                       defaultOption: {'label': 'Selecione uma opção...', 'value': null}
                     }
                   },
                    coma: {
                        selectOptions: {
                            collection: [
                                {'label': 'Sem coma', 'value': 1},
                                {'label': 'Coma por medicação', 'value': 2},
                                {'label': 'Coma por outra causa', 'value': 3},
                                {'label': 'Coma por causa combinada', 'value': 4}
                            ],
                            defaultOption: {'label': 'Selecione uma opção...', 'value': null}
                        }
                    }
                }
            });


            return bindings;
        },

        patientBindings: {
            '.name-el':'name'
        },

        events: {
            'click button.save-model': 'saveModel',
            'click button.cancel': 'cancel'
        },

        initialize: function () {

        },

        render: function () {
            this.$el.html(this.html);
            this.stickit();
            this.stickit(this.model.patient, this.patientBindings);
            return this;
        },
        cancel: function () {
          //window.history.back();
          app.mainRouter.navigate('#patients/' + this.collection.patient.get('id') + '/evaluations', true)
        },
        saveModel: function () {
            if (!this.model.isValid(true)){
                this.$('.alert-danger').removeClass('hidden').html('Um ou mais campos contem dados inválidos');
                return;
            }
            var self = this;
            this.model.save({}, {
                success: function(model, response, options){
                    console.log('Predeliric saved', model, response, options);
                    app.mainRouter.navigate('#patients/' + model.get('patientid') + '/evaluations', true);
                },
                error: function(model, response, options){
                    var msg = '--';
                    console.log('Error saving predeliric', model, response, options);
                    if ((response.responseJSON) && (response.responseJSON.message)){
                        msg = response.responseJSON.message;
                    }
                    this.$('.alert-danger').removeClass('hidden').html('Erro ao salvar dados');
                }
            })
        }
    });

    return PredeliricView;
});