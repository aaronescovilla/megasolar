"""Font files for the Megasolar design system. Run from the repository root after tools/fetch-fonts.sh:

    python3 tools/ds_fonts.py           # writes design-system/project/fonts/

Saira is fixed at its widest setting (125) so the display face needs no font-stretch.
"""
import os, shutil
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

OUT = 'design-system/project/fonts/'
os.makedirs(OUT, exist_ok=True)

f = TTFont('tools/fonts/saira.woff2')
exp = instancer.instantiateVariableFont(f, {'wdth': 125})
exp.flavor = 'woff2'
exp.save(OUT + 'SairaExpanded.woff2')
shutil.copyfile('tools/fonts/geist.woff2', OUT + 'Geist.woff2')
shutil.copyfile('tools/fonts/geistmono.woff2', OUT + 'GeistMono.woff2')

def names(path):
    n = TTFont(path)['name']
    get = lambda i: (n.getDebugName(i) or '').strip()
    return get(0), get(13), get(14)

lines = ['# Font licences', '', 'All three families are licensed under the SIL Open Font License 1.1 (https://openfontlicense.org).', '']
for label, src, note in [
    ('SairaExpanded.woff2', 'tools/fonts/saira.woff2', 'Saira, Latin subset, fixed at width 125. A modified version of the original.'),
    ('Geist.woff2', 'tools/fonts/geist.woff2', 'Geist, Latin subset, unmodified.'),
    ('GeistMono.woff2', 'tools/fonts/geistmono.woff2', 'Geist Mono, Latin subset, unmodified.')]:
    cp, lic, url = names(src)
    lines += ['## ' + label, '', note, '', cp, '']
    print(label, '|', cp, '|', lic[:90], '|', url)
open(OUT + 'LICENSES.md', 'w').write('\n'.join(lines))
print(sorted(os.listdir(OUT)), [os.path.getsize(OUT + x) for x in sorted(os.listdir(OUT))])
print('axes', [(a.axisTag, a.minValue, a.maxValue) for a in TTFont(OUT + 'SairaExpanded.woff2')['fvar'].axes])
