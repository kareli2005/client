import { useLanguage } from '../context/LanguageContext'

const TranslateText = (textKey) => {
  const { languageData } = useLanguage()
  return languageData[textKey] || textKey
}
export default TranslateText