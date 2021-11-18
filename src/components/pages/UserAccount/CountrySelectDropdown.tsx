import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  fetchLanguageCodes,
  getLaunguageCodesSelector,
} from '../../../redux/Slices/UserAccount/getLanguageCodes';

type CountryProps = {
  selectedLanguageCode: string;
  updateSelectedLanguage: (arg: string) => void;
};

export const CountrySelectDropdown: FC<CountryProps> = ({
  selectedLanguageCode,
  updateSelectedLanguage,
}) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const changeCountry = (newCountry: string): void => {
    i18n.changeLanguage(newCountry.toLocaleLowerCase());
    updateSelectedLanguage(newCountry);
  };
  const { languageCodes, loading, hasErrors } = useSelector(
    getLaunguageCodesSelector
  );

  useEffect(() => {
    dispatch(fetchLanguageCodes());
  }, [dispatch]);

  const renderLanguageCodes = () => {
    if (loading || hasErrors) return <option value='EN'>EN</option>;
    return languageCodes?.map((languageCode: any) => (
      <option value={languageCode.code}>{languageCode.code}</option>
    ));
  };

  return (
    <form>
      <select
        className='border-0'
        onChange={(event) => changeCountry(event.target.value)}
        value={selectedLanguageCode}
      >
        {renderLanguageCodes()}
      </select>
    </form>
  );
};
