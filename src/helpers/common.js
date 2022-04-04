import * as enums from "../type/Types";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export function createSearchPanelItems(docTypeField, onSPTextBoxChange) {
  let sFields = [];
  sFields.push({
    id: -4,
    fieldName: "b.tBatchId",
    operator: 0,
    between: false,
    values: [null, null],
    caption: "BatchId",
    fieldInputType: enums.FieldInputTypeMetinKutusu,
    fieldDataType: enums.FieldDataTypeSayi,
    fieldType: enums.FieldTypeUstAlan,
    lookUpDataId: 0,
    lookUpDataList: [],
  });
  sFields.push({
    id: -3,
    fieldName: "b.BarcodeValue",
    operator: 0,
    between: false,
    values: [null, null],
    caption: "Batch Barkodu",
    fieldInputType: enums.FieldInputTypeMetinKutusu,
    fieldDataType: enums.FieldDataTypeMetin,
    fieldType: enums.FieldTypeUstAlan,
    lookUpDataId: 0,
    lookUpDataList: [],
  });
  sFields.push({
    id: -2,
    fieldName: "pg.tPageGroupId",
    operator: 0,
    between: false,
    values: [null, null],
    caption: "PageGroupId",
    fieldInputType: enums.FieldInputTypeMetinKutusu,
    fieldDataType: enums.FieldDataTypeSayi,
    fieldType: enums.FieldTypeUstAlan,
    lookUpDataId: 0,
    lookUpDataList: [],
  });
  sFields.push({
    id: -1,
    fieldName: "pg.BarcodeValue",
    operator: 0,
    between: false,
    values: [null, null],
    caption: "PageGroup Barkodu",
    fieldInputType: enums.FieldInputTypeMetinKutusu,
    fieldDataType: enums.FieldDataTypeMetin,
    fieldType: enums.FieldTypeUstAlan,
    lookUpDataId: 0,
    lookUpDataList: [],
  });
  sFields.push({
    id: 0,
    fieldName: "pgo.OcrResult",
    operator: 0,
    between: false,
    values: [null, null],
    caption: "İçerik",
    fieldInputType: enums.FieldInputTypeMetinKutusu,
    fieldDataType: enums.FieldDataTypeMetin,
    fieldType: enums.FieldTypeUstAlan,
    lookUpDataId: 0,
    lookUpDataList: [],
  });
  docTypeField.forEach((field) => {
    let searchField = {};
    searchField.id = field.tDocTypeIndexMapId;
    searchField.fieldName = field.FieldName;
    searchField.operator = 0;
    searchField.between = false;
    searchField.values = [null, null];
    searchField.caption = field.Caption;
    searchField.fieldInputType = field.InputType;
    searchField.fieldDataType = field.FieldDataType;
    searchField.fieldType = enums.FieldTypeUstAlan;
    searchField.lookUpDataId = field.tLookUpDataId;
    searchField.lookUpDataList = [];
    searchField.onTextChange = onSPTextBoxChange;
    sFields.push(searchField);
  });
  return sFields;
}

export function createSearcPanelElement(searchField, props) {
  //fieldDataType
  //fieldType

  if (
    searchField.fieldInputType === enums.FieldInputTypeMetinKutusu ||
    searchField.fieldInputType === enums.FieldInputTypeTamamlamaliMetinKutusu
  ) {
    return (
      <TextField
        id={searchField.id.toString()}
        key={searchField.id.toString()}
        label={searchField.caption}
        defaultValue={searchField.values[0]}
        type={
          searchField.fieldDataType === enums.FieldDataTypeSayi ||
          searchField.fieldDataType === enums.FieldDataTypeOndalıkSayi
            ? "number"
            : "text"
        }
        onChange={props.onSPTextBoxChange}
      />
    );
  } else if (searchField.fieldInputType === enums.FieldInputTypeTarihKutusu) {
    return (
      <TextField
        id={searchField.id.toString()}
        key={searchField.id.toString()}
        label={searchField.caption}
        type="date"
        defalutValue={null}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={props.onSPDateBoxChange}
      />
    );
  } else if (
    searchField.fieldInputType === enums.FieldInputTypeTarihSaatKutusu
  ) {
    return (
      <TextField
        id={searchField.id.toString()}
        key={searchField.id.toString()}
        label={searchField.caption}
        type="datetime-local"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={props.onSPDateBoxChange}
      />
    );
  } else if (searchField.fieldInputType === enums.FieldInputTypeOnayKutusu) {
    return (
      <FormControl component="fieldset" key={"fc" + searchField.id.toString()}>
        <FormControlLabel
          key={"fcl" + searchField.id.toString()}
          control={
            <Checkbox
              id={searchField.id.toString()}
              key={searchField.id.toString()}
              checked={searchField.values[0]}
              onChange={props.onSPCheckBoxChange}
              name={searchField.id.toString()}
            />
          }
          label={searchField.caption}
        />
      </FormControl>
    );
  } else if (searchField.fieldInputType === enums.FieldInputTypeAcilirKutu) {
    return (
      <Autocomplete
        id={searchField.id.toString()}
        key={searchField.id.toString()}
        name={searchField.id.toString()}
        onOpen={props.onOpenComboBox}
        onChange={props.onComboBoxChange}
        closeIcon={null}
        freeSolo
        options={searchField.lookUpDataList.map(
          (option) => option.tLookUpDataDetailsId + "-" + option.TextValue
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={searchField.caption}
            margin="normal"
            //variant="outlined"
          />
        )}
      />
    );
  } else if (
    searchField.fieldInputType === enums.FieldInputTypeRadioGroupKontrol
  ) {
    // props.loadRadioItems(searchField.id);
    return (
      <FormControl component="fieldset" key={"fc" +searchField.id.toString()}>
        <FormLabel component="legend" key={"fl" +searchField.id.toString()}>{searchField.caption}</FormLabel>
        <RadioGroup
          aria-label={"al"+ searchField.fieldName}
          id={searchField.id.toString()}
          key={"rg"+searchField.id.toString()}
          name={searchField.id.toString()}
          onChange={props.onRadioChange}
        >
          {searchField.lookUpDataList.map((option) => (
            <FormControlLabel
              key={"fcl" + option.tLookUpDataDetailsId.toString()}
              value={option.tLookUpDataDetailsId.toString()}
              control={
                <Radio
                  color="primary"
                  key={"rd" + option.tLookUpDataDetailsId.toString()}
                />
              }
              label={option.TextValue}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }
}

export function calcGridPageCount(totalRowCount, perPageRowCount){
  let pageCount = 0;
  if(perPageRowCount >= totalRowCount){
    pageCount = 0;
  }  
  else {
    let remain = totalRowCount % perPageRowCount;
    pageCount = parseInt((totalRowCount / perPageRowCount) ,0);
    if(remain > 0)
      pageCount++;
  }
  return pageCount;

}


export default { createSearchPanelItems, createSearcPanelElement,calcGridPageCount };
