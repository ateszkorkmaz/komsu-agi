/**
 * Komşu Ağı - Neighbor Network
 * Multi-language Test App
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {initI18n} from './src/i18n/config';
import {useLanguage} from './src/hooks/useLanguage';

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initI18n().then(() => setIsReady(true));
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1628" />
      <AppContent />
    </SafeAreaView>
  );
}

function AppContent() {
  const {t, currentLanguage, availableLanguages, switchLanguage} =
    useLanguage();

  return (
    <ScrollView style={styles.scrollView}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t('common.appName')}</Text>
        <Text style={styles.subtitle}>Multi-Language Test</Text>
        <View style={styles.currentLangBadge}>
          <Text style={styles.currentLangText}>
            {currentLanguage.flag} {currentLanguage.name}
          </Text>
        </View>
      </View>

      {/* Language Selector */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌍 Select Language</Text>
        <View style={styles.languageGrid}>
          {availableLanguages.map(lang => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageButton,
                currentLanguage.code === lang.code &&
                  styles.languageButtonActive,
              ]}
              onPress={() => switchLanguage(lang.code)}>
              <Text style={styles.languageFlag}>{lang.flag}</Text>
              <Text
                style={[
                  styles.languageName,
                  currentLanguage.code === lang.code &&
                    styles.languageNameActive,
                ]}>
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Common Translations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📝 Common Phrases</Text>
        <TranslationItem label="App Name" value={t('common.appName')} />
        <TranslationItem label="OK" value={t('common.ok')} />
        <TranslationItem label="Cancel" value={t('common.cancel')} />
        <TranslationItem label="Loading" value={t('common.loading')} />
      </View>

      {/* Emergency Translations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🆘 Emergency</Text>
        <TranslationItem label="SOS" value={t('emergency.sos')} />
        <TranslationItem label="I'm Safe" value={t('emergency.imSafe')} />
        <TranslationItem label="Need Help" value={t('emergency.needHelp')} />
        <TranslationItem
          label="Share Location"
          value={t('emergency.shareLocation')}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🏘️ Komşu Ağı - Mahalle Mesh Network
        </Text>
        <Text style={styles.footerSubtext}>v1.0.0 - Phase 1</Text>
      </View>
    </ScrollView>
  );
}

function TranslationItem({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.translationItem}>
      <Text style={styles.translationLabel}>{label}:</Text>
      <Text style={styles.translationValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1628',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A1628',
  },
  loadingText: {
    marginTop: 16,
    color: '#F8FAFC',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1E293B',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 16,
  },
  currentLangBadge: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  currentLangText: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 16,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  languageButton: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#334155',
    minWidth: 100,
    alignItems: 'center',
  },
  languageButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#60A5FA',
  },
  languageFlag: {
    fontSize: 24,
    marginBottom: 4,
  },
  languageName: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
  languageNameActive: {
    color: '#F8FAFC',
  },
  translationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  translationLabel: {
    color: '#94A3B8',
    fontSize: 14,
    flex: 1,
  },
  translationValue: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  footerSubtext: {
    color: '#94A3B8',
    fontSize: 14,
  },
});

export default App;
