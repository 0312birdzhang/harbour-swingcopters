# NOTICE:
#
# Application name defined in TARGET has a corresponding QML filename.
# If name defined in TARGET is changed, the following needs to be done
# to match new name:
#   - corresponding QML filename must be changed
#   - desktop icon filename must be changed
#   - desktop filename must be changed
#   - icon definition filename in desktop file must be changed
#   - translation filenames have to be changed

# The name of your application
TARGET = SwingCopters

CONFIG += sailfishapp

SOURCES += src/SwingCopters.cpp

OTHER_FILES += qml/SwingCopters.qml \
    qml/cover/CoverPage.qml \
    qml/pages/FirstPage.qml \
    qml/pages/qml/*.qml \
    qml/pages/img/*.png \
    qml/pages/script.js \
    rpm/SwingCopters.spec \
    rpm/SwingCopters.yaml \
    translations/*.ts \
    SwingCopters.desktop \
    qml/pages/img/cover.png \
    rpm/SwingCopters.changes

# to disable building translations every time, comment out the
# following CONFIG line
CONFIG += sailfishapp_i18n
TRANSLATIONS += translations/SwingCopters-de.ts

