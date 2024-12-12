import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    ViewChild,
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

// Spartan
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
    BrnDialogRef,
    injectBrnDialogContext,
} from '@spartan-ng/ui-dialog-brain';
import {
    HlmDialogComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import {
    BrnSelectComponent,
    BrnSelectImports,
} from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';

// Component Store
import { UpdateAddressDialogStore } from './update-address-dialog.store';

// Models
import { Address, UpdateAddressForm } from 'src/shared/models/address';

@Component({
    selector: 'app-update-address-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,

        HlmSpinnerComponent,

        HlmButtonDirective,

        HlmLabelDirective,
        HlmInputDirective,

        HlmDialogComponent,
        HlmDialogHeaderComponent,
        HlmDialogTitleDirective,

        BrnSelectImports,
        HlmSelectImports,
    ],
    templateUrl: './update-address-dialog.component.html',
    styleUrl: './update-address-dialog.component.scss',
    providers: [UpdateAddressDialogStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateAddressDialogComponent {
    private readonly _dialogRef = inject<BrnDialogRef<boolean>>(BrnDialogRef);
    private readonly _dialogContext = injectBrnDialogContext<{
        address: Address;
    }>();
    private readonly _updateAddressDialogStore = inject(
        UpdateAddressDialogStore
    );

    vm$ = this._updateAddressDialogStore.vm$;

    updateAddressForm = new FormGroup({
        address: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
    });

    @ViewChild('countrySelect') countrySelect:
        | BrnSelectComponent<string>
        | undefined;

    ngOnInit() {
        const { address, country } = this._dialogContext.address;

        this.updateAddressForm.patchValue({
            address,
            country,
        });

        this.updateAddressForm.markAsUntouched();
        this.updateAddressForm.markAsPristine();
    }

    ngAfterViewInit() {
        if (this.countrySelect) {
            this.countrySelect.registerOnChange((country) => {
                this.updateAddressForm.patchValue({
                    country,
                });

                this.updateAddressForm.markAsDirty();
            });

            this.countrySelect.registerOnTouched(() => {
                this.updateAddressForm.controls.country.markAsTouched();
            });

            this.countrySelect.writeValue(this._dialogContext.address.country);
        }
    }

    handleOnCancel() {
        this._dialogRef.close(false);
    }

    handleOnSubmit() {
        const value = this.updateAddressForm.getRawValue();

        if (this.updateAddressForm.valid) {
            const form: UpdateAddressForm = {
                address: value.address!,
                country: value.country!,
            };

            this._updateAddressDialogStore.update({
                id: this._dialogContext.address.id,
                form: form,
                success: () => {
                    this._dialogRef.close(true);
                },
            });
        }
    }

    countryList = [
        'Afghanistan',
        'Albania',
        'Algeria',
        'American Samoa',
        'Andorra',
        'Angola',
        'Anguilla',
        'Antarctica',
        'Antigua and Barbuda',
        'Argentina',
        'Armenia',
        'Aruba',
        'Australia',
        'Austria',
        'Azerbaijan',
        'Bahamas (the)',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bermuda',
        'Bhutan',
        'Bolivia (Plurinational State of)',
        'Bonaire, Sint Eustatius and Saba',
        'Bosnia and Herzegovina',
        'Botswana',
        'Bouvet Island',
        'Brazil',
        'British Indian Ocean Territory (the)',
        'Brunei Darussalam',
        'Bulgaria',
        'Burkina Faso',
        'Burundi',
        'Cabo Verde',
        'Cambodia',
        'Cameroon',
        'Canada',
        'Cayman Islands (the)',
        'Central African Republic (the)',
        'Chad',
        'Chile',
        'China',
        'Christmas Island',
        'Cocos (Keeling) Islands (the)',
        'Colombia',
        'Comoros (the)',
        'Congo (the Democratic Republic of the)',
        'Congo (the)',
        'Cook Islands (the)',
        'Costa Rica',
        'Croatia',
        'Cuba',
        'Curaçao',
        'Cyprus',
        'Czechia',
        "Côte d'Ivoire",
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic (the)',
        'Ecuador',
        'Egypt',
        'El Salvador',
        'Equatorial Guinea',
        'Eritrea',
        'Estonia',
        'Eswatini',
        'Ethiopia',
        'Falkland Islands (the) [Malvinas]',
        'Faroe Islands (the)',
        'Fiji',
        'Finland',
        'France',
        'French Guiana',
        'French Polynesia',
        'French Southern Territories (the)',
        'Gabon',
        'Gambia (the)',
        'Georgia',
        'Germany',
        'Ghana',
        'Gibraltar',
        'Greece',
        'Greenland',
        'Grenada',
        'Guadeloupe',
        'Guam',
        'Guatemala',
        'Guernsey',
        'Guinea',
        'Guinea-Bissau',
        'Guyana',
        'Haiti',
        'Heard Island and McDonald Islands',
        'Holy See (the)',
        'Honduras',
        'Hong Kong',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iran (Islamic Republic of)',
        'Iraq',
        'Ireland',
        'Isle of Man',
        'Israel',
        'Italy',
        'Jamaica',
        'Japan',
        'Jersey',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kiribati',
        "Korea (the Democratic People's Republic of)",
        'Korea (the Republic of)',
        'Kuwait',
        'Kyrgyzstan',
        "Lao People's Democratic Republic (the)",
        'Latvia',
        'Lebanon',
        'Lesotho',
        'Liberia',
        'Libya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Macao',
        'Madagascar',
        'Malawi',
        'Malaysia',
        'Maldives',
        'Mali',
        'Malta',
        'Marshall Islands (the)',
        'Martinique',
        'Mauritania',
        'Mauritius',
        'Mayotte',
        'Mexico',
        'Micronesia (Federated States of)',
        'Moldova (the Republic of)',
        'Monaco',
        'Mongolia',
        'Montenegro',
        'Montserrat',
        'Morocco',
        'Mozambique',
        'Myanmar',
        'Namibia',
        'Nauru',
        'Nepal',
        'Netherlands (the)',
        'New Caledonia',
        'New Zealand',
        'Nicaragua',
        'Niger (the)',
        'Nigeria',
        'Niue',
        'Norfolk Island',
        'Northern Mariana Islands (the)',
        'Norway',
        'Oman',
        'Pakistan',
        'Palau',
        'Palestine, State of',
        'Panama',
        'Papua New Guinea',
        'Paraguay',
        'Peru',
        'Philippines (the)',
        'Pitcairn',
        'Poland',
        'Portugal',
        'Puerto Rico',
        'Qatar',
        'Republic of North Macedonia',
        'Romania',
        'Russian Federation (the)',
        'Rwanda',
        'Réunion',
        'Saint Barthélemy',
        'Saint Helena, Ascension and Tristan da Cunha',
        'Saint Kitts and Nevis',
        'Saint Lucia',
        'Saint Martin (French part)',
        'Saint Pierre and Miquelon',
        'Saint Vincent and the Grenadines',
        'Samoa',
        'San Marino',
        'Sao Tome and Principe',
        'Saudi Arabia',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Sierra Leone',
        'Singapore',
        'Sint Maarten (Dutch part)',
        'Slovakia',
        'Slovenia',
        'Solomon Islands',
        'Somalia',
        'South Africa',
        'South Georgia and the South Sandwich Islands',
        'South Sudan',
        'Spain',
        'Sri Lanka',
        'Sudan (the)',
        'Suriname',
        'Svalbard and Jan Mayen',
        'Sweden',
        'Switzerland',
        'Syrian Arab Republic',
        'Taiwan',
        'Tajikistan',
        'Tanzania, United Republic of',
        'Thailand',
        'Timor-Leste',
        'Togo',
        'Tokelau',
        'Tonga',
        'Trinidad and Tobago',
        'Tunisia',
        'Turkey',
        'Turkmenistan',
        'Turks and Caicos Islands (the)',
        'Tuvalu',
        'Uganda',
        'Ukraine',
        'United Arab Emirates (the)',
        'United Kingdom of Great Britain and Northern Ireland (the)',
        'United States Minor Outlying Islands (the)',
        'United States of America (the)',
        'Uruguay',
        'Uzbekistan',
        'Vanuatu',
        'Venezuela (Bolivarian Republic of)',
        'Viet Nam',
        'Virgin Islands (British)',
        'Virgin Islands (U.S.)',
        'Wallis and Futuna',
        'Western Sahara',
        'Yemen',
        'Zambia',
        'Zimbabwe',
        'Åland Islands',
    ];
}
