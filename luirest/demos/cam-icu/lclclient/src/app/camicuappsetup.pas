unit CAMICUAppSetup;

{$mode objfpc}{$H+}

interface

uses
  Classes, SysUtils, CAMICUApp;

procedure ConfigureApp(App: TCAMICUApp);

implementation

uses
  PresentationManager,
  AppConfigView
  ;

procedure ConfigureApp(App: TCAMICUApp);
var
  Presentations: TPresentationManager;
begin
  Presentations := App.Presentations;
  Presentations.Register('appconfig', TAppConfigViewForm);
  //Presentations.Register('patient', TPatientForm, TPatientPresenter);
end;

end.

