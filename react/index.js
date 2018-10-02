import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Query } from 'react-apollo'
import { Adopt } from 'react-adopt'
import Tabs from 'vtex.styleguide/Tabs'
import Tab from 'vtex.styleguide/Tab'

import logisticsQuery from './queries/logistics.gql'
import AddressSearch from './components/AddressSearch'
import AddressRedeem from './components/AddressRedeem'
import './global.css'

class AddressLocator extends Component {
  state = {
    currentTab: 1,
  }

  handleTabChange = tabIndex => {
    this.setState({
      currentTab: tabIndex,
    })
  }

  render() {
    const { currentTab } = this.state

    return (
      <div className="vtex-address-locator w-100 flex flex-column justify-center items-center pa6">
        <Adopt mapper={{
          title: <FormattedMessage id="address-locator.order-title" />,
        }}>
          {({ title }) => (
            <span className="db b f1 mb7">{title}</span>
          )}
        </Adopt>
        <Adopt mapper={{
          addressSearchTab: <FormattedMessage id="address-locator.address-search-tab" />,
          addressRedeemTab: <FormattedMessage id="address-locator.address-redeem-tab" />,
        }}>
          {({ addressSearchTab, addressRedeemTab }) => (
            <Tabs fullWidth>
              <Tab label={addressSearchTab} active={currentTab === 1} onClick={() => this.handleTabChange(1)}>
                <Query query={logisticsQuery}>
                  {({ data }) => {
                    const { googleMapsKey } = data.logistics

                    return (
                      <AddressSearch
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&v=3.exp&libraries=places`}
                        googleMapKey={googleMapsKey}
                        loadingElement={<div className="h-100" />}
                      />
                    )
                  }}
                </Query>
              </Tab>
              <Tab label={addressRedeemTab} active={currentTab === 2} onClick={() => this.handleTabChange(2)}>
                <AddressRedeem />
              </Tab>
            </Tabs>
          )}
        </Adopt>
      </div>
    )
  }
}

export default AddressLocator
